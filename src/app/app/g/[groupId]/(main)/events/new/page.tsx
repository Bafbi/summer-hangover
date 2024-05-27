export default function GroupFormPage() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur backdrop-filter">
        <div className="bg-surface relative w-full max-w-md rounded-lg p-4">
          <form className="space-y-4">
            <h2 className="text-lg font-bold">Proposer un event</h2>
            <input
              type="text"
              placeholder="Lieu(x)"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Description"
              className="textarea textarea-bordered w-full"
            ></textarea>
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
          <button className="absolute right-2 top-2">&times;</button>
        </div>
      </div>
    </>
  );
}
