const amqp = require('amqplib');

async function connect() {
	const msgBuffer = Buffer.from(JSON.stringify({ number: 12 }));

	try {
		// creates TCP connection with RabbitMQ service
		const connection = await amqp.connect('amqp://localhost:5672');

		// creates virtual link in created connection
		const channel = await connection.createChannel();

		// connects or creates queue (if doesn’t exists)
		await channel.assertQueue('number');

		// sends a message to specified queue
		await channel.sendToQueue('number', msgBuffer);

		console.log('Sending message to number queue');

		// closes virtual link within created connection
		await channel.close();

		// closes TCP connection with RabbitMQ service
		await connection.close();
	} catch (ex) {
		console.error(ex);
	}
}

connect();
