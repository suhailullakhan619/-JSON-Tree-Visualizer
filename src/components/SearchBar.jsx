import { Copy } from 'lucide-react';

export default function SearchBar({ search, setSearch, onSearch }) {
   const handleChange = () => {
    onSearch(search); // 🔥 Call handleSearch with the current input
  };
    const handleCopy=()=>{
    navigator.clipboard.writeText(search)
    .then(()=>{
      alert('Copied to clipboard ✅')
    })
    .catch((e)=>{
      alert('Failed to copy:',e)
    })
  }
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="$.user.address.city"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={handleChange}  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}>Search</button>

        <button style={{padding:'5px 10px'}} onClick={handleCopy}> <Copy size={20} /></button>
    </div>
  );
}
