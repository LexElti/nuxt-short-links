const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/User')
const router = Router()

router.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'The minimum password length is 6 characters')
			.isLength({min: 6})
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Invalid data during registration'
			})
		}

		const {email, password} = req.body

		const candidate = await User.findOne({email})

		if (candidate) {
			return res.status(400).json({message: 'This user already exists'})
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({email, password: hashedPassword})

		await user.save()

		res.status(201).json({message: 'The user is created'})
	} catch (e) {
		res.status(500).json({message: 'Server Error'})
	}
})

router.post(
	'/login',
	[
		check('email', 'Enter the correct email').isEmail(),
		check('password', 'Enter the password').exists()
	],
	async (req, res) => {
	try {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Invalid data when you log in'
			})
		}

		const {email, password} = req.body

		const user = await User.findOne({email})

		if (!user) {
			return res.status(400).json({message: 'The user is not found'})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(400).json({message: 'Wrong password'})
		}

		const token = jwt.sign(
			{userId: user.id},
      keys.JWT,
			{expiresIn: '1h'}
		)

		res.json({token, userId: user.id})
	} catch (e) {
		res.status(500).json({message: 'Server Error'})
	}
})

module.exports = router
