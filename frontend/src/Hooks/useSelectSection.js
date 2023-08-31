import { toast } from "react-toastify";

function useSelectSection() {
  const escapeRegExp = (string) => {
    return string.replace(/[<>.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const addSection = (value, setValue) => {
    const selection = window.getSelection();

    if (selection && selection.toString().trim() !== '') {
      const anchorText = selection.toString(); // to make selection for specific text. 
      const headerTag = prompt('Enter the section ID.');

      console.log(anchorText)

      if (headerTag) {
        const anchorTag = `<div id="${headerTag}">${anchorText}</div>`;
        const regex = new RegExp(`(${escapeRegExp(anchorText)}\\s*)`, 'g');
        const updatedContent = value.replace(regex, `${anchorTag}`); // i'm used regular expression for replace old text with new one that contain the id 
        setValue(updatedContent); // update value 
      }
    } else {
      toast.error("please select section.")
    }
  };

  return addSection
}


export default useSelectSection