// src/components/BlogContent.js
export const Content = ({ title, author, date, content }: any) => {
  return (
    <article className="max-w-4xl mx-auto p-4">
      {true && (
        <div className="mb-4">
          <img
            src="https://i.pinimg.com/originals/c9/27/d5/c927d5d5a5a22ef621cae30bb882e234.jpg"
            alt={title}
            className="w-full max-h-[400px] h-auto object-cover rounded-lg"
          />
        </div>
      )}
      <header className="mb-4">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <div className="flex items-center text-gray-600">
          <p className="mr-2">{author}</p>
          <span className="mr-2">•</span>
          <p>{date}</p>
        </div>
      </header>
      <section className="prose lg:prose-xl">{content}</section>
    </article>
  );
};
