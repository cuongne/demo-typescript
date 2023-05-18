export function swapArrayElements(arr: Array<any>, indexStart: number, indexEnd: number) {
    [arr[indexStart], arr[indexEnd]] = [arr[indexEnd], arr[indexStart]];
    return arr;
}
export function convertDateTime(time:number) {
    return new Date(time).toLocaleDateString("en-US");
}