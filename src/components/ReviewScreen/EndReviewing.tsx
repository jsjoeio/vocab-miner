import { ScreenState } from "../../App"

type ModalProps = {
  setScreenState: (screenState: ScreenState) => void
}

function Modal({ setScreenState }: ModalProps) {
  return (
    <dialog id="end-reviewing" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">
          This will end the review and go to the next screen which will show you
          you're mined words and ignored words.
        </p>
        <button
          className="btn btn-sm hover:btn-error block mx-auto"
          onClick={() => setScreenState("done")}
        >
          End Review
        </button>
      </div>
    </dialog>
  )
}

type EndReviewingProps = {
  setScreenState: (screenState: ScreenState) => void
}

export function EndReviewing({ setScreenState }: EndReviewingProps) {
  return (
    <>
      <button
        className="btn btn-ghost block mx-auto"
        onClick={() => {
          // @ts-ignore - this is from daisyUI docs
          document.getElementById("end-reviewing")?.showModal()
        }}
      >
        End review?
      </button>
      <Modal setScreenState={setScreenState} />
    </>
  )
}
