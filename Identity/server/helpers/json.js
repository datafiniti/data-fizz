function good(obj, res) {
	res.send({
		success: 1,
		res: obj
	});
}

function bad(err, res, type=null) {

	let obj = {
		success: 0,
		res: err,
		type: type
	}

	if (obj.res.errors) {
		obj.res.messages = [];

		for (let i in obj.res.errors) {
			obj.res.messages.push(obj.res.errors[i].message);
		}

		obj.res.message = obj.res.messages[0];
	}

	res.send(obj);
}

export default {
	good: good,
	bad: bad
} 