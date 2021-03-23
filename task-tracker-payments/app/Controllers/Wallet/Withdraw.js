const Task = require('$Models/Task');
const Wallet = require('$Models/Wallet');
const { sendEvent } = require('$Modules/MB');

module.exports = async data => {
	const { id: taskID, description, assignee_id: assigneeID } = data;

	const task = await Task.findOne({_id: taskID});

	if(!task){
		throw new Error(`Task ${taskID} not found`);
	}

	let wallet = await Wallet.findOne({employee_id: assigneeID});
	if(!wallet){
		wallet = await Wallet.create({
			employee_id: assigneeID,
			sum: 0,
		})
	}

	task.assignee_id = assigneeID;
	await task.save();
	wallet.sum -= task.cost;
	await wallet.save();

	await sendEvent('payments', 'WalletWithdrawn', {
		employee_id: assigneeID,
		total: -task.cost,
		description: `Задача ${task._id} назначена на ${assigneeID}, будет списано ${task.cost} деняк`,
		task_description: description,
	});
}
