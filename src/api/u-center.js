export function doRecordList(type,rewardType) {
	return Api.doRecordList(type,rewardType)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}