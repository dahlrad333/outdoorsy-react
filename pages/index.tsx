import SearchComponent from "../components/search";

export default function Home() {

  return (
    <>
        <div
          className={`w-full h-full flex flex-col justify-start items-center`}
        >
          <SearchComponent></SearchComponent>
        </div>
    </>
  )
}
