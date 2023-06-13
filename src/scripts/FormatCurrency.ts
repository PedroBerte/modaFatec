export function formatInputCurrency(value: string) {
  if (value == "") return "";
  var v: any;

  if (value == undefined) return;
  if (value.length >= 1) {
    v = value.replace(/\D/g, "");
    v = (Number(v) / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

    return v;
  }
}
