import { Api } from "./api";

/* 商户资金明细列表 */
export const funddetails = (data) => {
	return Api.get('/private/merchant/funddetails',data);
}