import bcrypt from 'bcryptjs'

export const hashPassword = async (pwd: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(pwd, 10)
    return hashedPassword
}