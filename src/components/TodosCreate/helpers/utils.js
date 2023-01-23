export const prepareData = (obj) => {

	return {
		...obj,
		tags: obj.tags.split(",").map(el => el.trim()),
		deadLine: new Date(obj.deadLine).getTime()
	}
}