export function doRecordList() {
	return Api.doRecordList()
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doGetPlanlist() {
	return Api.doGetPlanlist()
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}