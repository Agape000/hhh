import MenuBar from '../components/MenuBar';

export default function Home() {
  return (
    <div>
      <MenuBar />

      <div className="p-8">
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
        <p className="mt-4">You are now logged in.</p>
      </div>
    </div>
  );
}
