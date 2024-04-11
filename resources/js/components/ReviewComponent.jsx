import { StarRating } from "./ui/star-rating";

const ReviewComponent = ({ stars, reviewText, user }) => {
    return (
        <>
            <h3 className="sr-only">Recente reviews</h3>
            <div className="">
                <div className="flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=256&amp;h=256&amp;q=80"
                        alt=""
                        className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-4">
                        <h4 className="font-bold text-md">Test test</h4>
                        <div className="flex">
                            <StarRating
                                value={4}
                                className={"fill-yellow-400"}
                            />

                            <p className="sr-only">4 sterren</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 italic">
                    <p className="text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel impedit inventore, earum nostrum porro dolorem
                        asperiores? Est, quasi. Saepe laborum sequi iste
                        repellat consequatur dolorem impedit, non aspernatur
                        temporibus est!
                    </p>
                </div>
            </div>
        </>
    );
};
export default ReviewComponent;
