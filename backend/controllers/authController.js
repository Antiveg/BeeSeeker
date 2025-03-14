const { User, Provider, Organization } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretKey = process.env.JWT_SECRETKEY
const path = require('path')

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            where: { 
                email: email,
            }
        })

        if(!user){
            const error = new Error('User not found')
            error.name = 'USER_NOT_FOUND'
            return next(error)
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            const error = new Error('Invalid credentials')
            error.name = 'INVALID_CREDENTIALS'
            return next(error)
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            secretKey,
            { expiresIn: '10h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000,
            path: '/',
        })

        let organization = null;
        if (user.role === 'Provider') {
            organization = await Provider.findOne({
                attributes: [],
                where: { userid: user.id },
                include: [
                    {
                        model: Organization,
                        attributes: ['name', 'logo', 'id']
                    }
                ]
            });
        }

        const logoUrl = organization?.Organization?.logo
            ? `http://localhost:5000/uploads/${organization.Organization.logo}`
            : null

        const encodedUrl = logoUrl ? encodeURI(logoUrl) : null;
        
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role,
                organization_name: organization?.Organization?.name || null,
                organization_id: organization?.Organization?.id || null,
                organization_logo: encodedUrl
            }
        });
    } catch (error) {
        next(error);
    }
}

const register = async (req, res, next) => {
    try {
        const { name, email, password, role, organization_name } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            // resume: null
        })

        if(role === 'Provider'){
            const relativePath = req.file.path.replace(/^.*[\\\/]?uploads[\\\/]/, '');
            const newOrganization = await Organization.create({
                name: organization_name,
                logo: relativePath,
            });
            const newProvider = await Provider.create({
                userid: newUser.id,
                organizationid: newOrganization.id
            })
        }

        const newUserJSON = newUser.toJSON()
        const newOrganizationJSON = newUser.toJSON()
        const newProviderJSON = newUser.toJSON()
        delete newUserJSON.password

        res.status(201).json({
            message: 'User registered successfully',
            user: newUserJSON,
            provider: newProviderJSON,
            organization: newOrganizationJSON
        })
    }catch (error){
        next(error);
    }
}

const logout = (req, res, next) => {
    try {
        res.clearCookie('token', { httpOnly: true, secure: true, path: '/' })
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = { login, register, logout };
