export function illegalVocabulary(mid) {
	return Api.illegalVocabulary(mid)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function doQueryLiveList(data) {
	return Api.doQueryLiveList(data)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
export function doJoinLive(planId) {
	return Api.doJoinLive(planId)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function redenvelopReceive(cost,planId,rewardId) {
	return Api.redenvelopReceive(cost,planId,rewardId)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}

export function uploadData(planId) {
	return Api.uploadData(planId)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}
