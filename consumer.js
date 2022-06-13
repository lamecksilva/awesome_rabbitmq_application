const amqp = require('amqplib');

async function connect() {
	try {
		// creates TCP connection with RabbitMQ service
		const connection = await amqp.connect('amqp://localhost:5672');

		// creates virtual link in created connection
		const channel = await connection.createChannel();

		// connects or creates queue (if doesn’t exists)
		await channel.assertQueue('number');

		// waiting to receive a message from specified queue, and execute callback function when message is emitted
		channel.consume('number', (message) => {
			const input = JSON.parse(message.content.toString());

			console.log(`Received number: ${input.number}`);
			// acknowledge to RabbitMQ service that particular message received, so it wouldn’t retry again
			channel.ack(message);
		});
		console.log(`Waiting for messages...`);
	} catch (ex) {
		console.error(ex);
	}
}

connect();
