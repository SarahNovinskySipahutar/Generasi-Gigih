import '../searchForm/SearchForm.css'

const SearchForm = ({ onSearch, handleChange, handlePlaylist }) => {
  return (
    <form onSubmit={onSearch}>
      <input type="text" id="inpuText" onChange={handleChange} required/>
      <button className='buttonSearch' type="submit" value="submit">
        Search
      </button>

    </form>
  );
};

export default SearchForm;