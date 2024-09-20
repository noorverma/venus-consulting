// code referenced from https://www.youtube.com/watch?v=fgbEwVWlpsI
// the code used in the video above used TypeScript and ChatGPT was used to change it to JavaScript
// Prompt: check the following code from any TypeScript components and change it to JavaScript if any found
export default function PaymentSuccess({ searchParams }) {
  const { amount } = searchParams;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </main>
  );
}