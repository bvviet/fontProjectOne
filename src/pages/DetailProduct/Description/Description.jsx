import "./Description.scss";
import product1 from "../../../assets/images/product1.png";
import product2 from "../../../assets/images/product2.png";
import product3 from "../../../assets/images/product3.png";

const Description = () => {
    return (
        <div className="description">
            <div>
                <h1 className="description__title">Lorem ipsum dolor sit amet.</h1>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet{" "}
                    <a href="#!" className="text-[#0071dc] underline">
                        consectetur
                    </a>
                    adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam sint dolorum recusandae voluptates
                    dignissimos similique animi assumenda{" "}
                    <a href="#!" className="text-[#0071dc] underline">
                        praesentium
                    </a>{" "}
                    et! Illum dolorem est rem voluptas nam! Voluptatem.
                </p>
            </div>
            {/* Item 1 */}
            <div className="description__item">
                <h2 className="description__title2">Lorem ipsum dolor sit amet.</h2>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
                <div>
                    <img src={product1} alt="" className="description__image" />
                    <p style={{ textAlign: "center", fontStyle: "italic" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
                <blockquote className="description__blockquote">
                    <p>
                        Lorem ipsum dolor sit amet consectetur{" "}
                        <a href="#!" className="underline">
                            adipisicing
                        </a>{" "}
                        elit. Aliquid, cupiditate. Modi, quidem, ullam sint dolorum recusandae voluptates dignissimos
                        similique animi assumenda praesentium et! Illum dolorem est rem voluptas nam! Voluptatem.
                    </p>
                </blockquote>
                <h2 className="description__title2">Lorem ipsum dolor sit amet.</h2>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
                <p className="description__desc" style={{ margin: "20px 0" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
            </div>
            <hr />
            {/* Item 2 */}
            <div className="description__item">
                <h2 className="description__title2">Lorem ipsum dolor sit amet.</h2>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
                <div>
                    <img src={product2} alt="" className="description__image" />
                    <p style={{ textAlign: "center", fontStyle: "italic" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
                <p className="description__desc" style={{ margin: "20px 0" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
            </div>
            <hr />
            {/* Item 3 */}
            <div className="description__item">
                <h2 className="description__title2">Lorem ipsum dolor sit amet.</h2>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
                <div>
                    <img src={product3} alt="" className="description__image" />
                    <p style={{ textAlign: "center", fontStyle: "italic" }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
                <p className="description__desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, cupiditate. Modi, quidem, ullam
                    sint dolorum recusandae voluptates dignissimos similique animi assumenda praesentium et! Illum
                    dolorem est rem voluptas nam! Voluptatem.
                </p>
            </div>
        </div>
    );
};
export default Description;
