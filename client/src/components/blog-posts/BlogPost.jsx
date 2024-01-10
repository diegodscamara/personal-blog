const BlogPost = ({ title, content, author, date, categories, tags }) => {
    return (
        <div className="border-b border-gray-200 p-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {author}</span>
                <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            {/* Optionally render categories and tags */}
        </div>
    );
};

export default BlogPost
