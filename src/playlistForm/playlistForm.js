import "../playlistForm/PlaylistForm.css";

const PlaylistForm = ({
  onCreate,
  handleChange,
  handleChangeDesc,
  handleChangeTitle,
}) => {
  return (
    <form className="form" onSubmit={onCreate}>
      <div className="form-text">
        <label>Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChangeTitle}
          //   minLength={10}
          required
        />
      </div>
      <div className="form-text">
        <label>Description</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChangeDesc}
          required
        />
      </div>
      <button type="submit" value="submit">
        Create playlist
      </button>
    </form>
  );
};

export default PlaylistForm;