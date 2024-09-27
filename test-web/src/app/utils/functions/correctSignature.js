const correctSignature = (signature) => {
  if (!signature) {
    return '';
  }
  const itemToReplace =
    '<div><span style="font-size: 12pt;"> <!--ReemplazaFirmaAqui--> </span></div>';
  const replaceWith = '<div><!--ReemplazaFirmaAqui--></div>';
  signature = signature.replace(itemToReplace, replaceWith);
  return signature;
};

export default correctSignature;
