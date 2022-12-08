export function getClassList(pid,mid) {
	return Api.getClassList(pid,mid)
		.then((response) => {
			return Promise.resolve(response.data);
		}).catch((err) => {
			return Promise.reject(err);
		});
}