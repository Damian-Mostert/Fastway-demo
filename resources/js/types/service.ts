export type Service = {
    type: string,
    name: string,
    labelcolour: string,
    labelcolour_array: string[],
    labelcolour_pretty: string,
    labelcolour_pretty_array: string[],
    weightlimit: number,
    baseweight: number,
    excess_labels_required: number,
    excess_label_price_normal: string,
    excess_label_price_frequent: string,
    excess_label_price_normal_exgst: string,
    excess_label_price_frequent_exgst: string,
    labelprice_normal: string,
    labelprice_frequent: string,
    labelprice_normal_exgst: string,
    labelprice_frequent_exgst: string,
    totalprice_normal: string,
    totalprice_frequent: string,
    totalprice_normal_exgst: number,
    totalprice_frequent_exgst: number,
    rural_labels_required: number,
    rural_labels_cost_exgst: string,
    rural_labels_cost:  string
}
export default {}