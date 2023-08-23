import { ImageUploader } from './components/ImageUploader';

export default function Home() {
  return (
    <div className='h-screen bg-gray-200'>
      <main className='flex items-center justify-center h-5/6'>
        <ImageUploader />
      </main>
      <footer className='flex items-end justify-center h-1/6 pb-3 text-sm text-black/40'>
        Created by @andres326 - devchallenges.io
      </footer>
    </div>
  );
}
