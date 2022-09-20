const nodemailer = require("nodemailer")
const Queue = require("bull")

const queue = new Queue("users", {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD
    },
    defaultJobOptions: {
        delay: 5000
    }
})

const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

queue.process(async (job, done) => {
    try {
        const label = "sending email request time"
        console.time(label)
        await transport.sendMail({
            from: "John Doe <email@address.com>",
            to: job.data.email,
            subject: `Welcome`,
            text: "Welcome",
            html: `<p>Your password is: <b>${job.data.password}</b></p>`
        })
        console.timeEnd(label)
        done(null)
    } catch (e) {
        const error = new Error(e)
        done(error)
        throw error
    }
})

module.exports = {
    queue
}