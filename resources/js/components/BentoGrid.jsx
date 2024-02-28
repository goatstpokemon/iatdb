const BentoGrid = () => {
    return (
        <section className="grid auto-rows-[80vw] grid-cols-3 gap-4 max-h-[40vh]">
            {[...Array(2)].map((_, i) => (
                <div
                    key={i}
                    className={`row-span-1 rounded-xl  bg-gray-100 p-4 dark:bg-gray-900 h-[40vh] ${
                        i === 1 ? "col-span-2" : ""
                    }`}
                ></div>
            ))}
        </section>
    );
};

export default BentoGrid;
