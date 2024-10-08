export function getBase64(file, onSuccess) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    onSuccess(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}