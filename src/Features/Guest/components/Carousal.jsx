import React from "react";

const Carousal=() =>{
  return (
    <section className="hero bg-blue-100 p-8 text-center">
      <h1 className="text-4xl font-bold">Document Management that delivers more for less</h1>
      <p className="mt-4">Organize, store, and share your documents with ease.</p>
      <form className="mt-4">
        <input type="email" placeholder="Enter your email" className="p-2 border rounded" />
        <button className="btn-primary ml-2">Try for Free</button>
      </form>
    </section>
  );
}

export default Carousal;
