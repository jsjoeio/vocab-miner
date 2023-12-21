interface MinedWordProps {
  word: string
  sentence: string | null
}
const highlightWord = (sentence: string, word: string) => {
  // Replace this with your actual logic to highlight the word in the sentence
  const regex = new RegExp(`\\b${word}\\b`, "gi")
  return sentence.replace(
    regex,
    (match) => `<span class="font-medium">${match}</span>`
  )
}

export function MinedWord({ word, sentence }: MinedWordProps) {
  const sentenceWithWordBolded = sentence ? highlightWord(sentence, word) : ""

  return (
    <li className="mb-4">
        <div className="tooltip tooltip-right" data-tip="Click to Copy">
            <button
              className="font-semibold text-lg"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(word)
                  // console.log("Copying successful!")
                  document.getElementsByClassName("tooltip-right")[0].setAttribute("data-tip", "Copied!")
                  // setTimeout(() => {
                  //   document.getElementsByClassName("tooltip-right")[0].setAttribute("className", "hidden")
                  // }, 1000);
                  // document.getElementsByClassName("tooltip-right")[0].setAttribute("data-tip", "Click to Copy")

                } catch (err) {
                  console.log("Could not copy text: ", err)
                }
              }}
            >
              {word}
            </button>
        </div>
      <span
        className="block italic font-light"
        dangerouslySetInnerHTML={{ __html: sentenceWithWordBolded }}
      />
    </li>
  )
}
