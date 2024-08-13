/* eslint-disable react/prop-types */
import { useContext } from "react";
import { OrderContext } from "../../hooks/OrderContext";

const Subtotal = ({ selectedOption }) => {
    const { total, sumQuantity } = useContext(OrderContext);
    const totalMoney = selectedOption === "noFree" ? total + 10000 : total;

    console.log(totalMoney);

    return (
        <div className="add-right__top">
            <div className="add-right__subtotal">
                <p className="add-right__subtotal-left">
                    Subtotal <span style={{ fontWeight: "400" }}>(items)</span>
                </p>
                <p className="add-right__subtotal-right">{sumQuantity}</p>
            </div>
            <div className="add-right__subtotal">
                <p className="add-right__subtotal-left">
                    Price <span style={{ fontWeight: "400" }}>(Total)</span>
                </p>
                <p className="add-right__subtotal-right">${total}</p>
            </div>

            <div className="add-right__subtotal">
                <p className="add-right__subtotal-left">Shipping</p>
                <p className="add-right__subtotal-right">{selectedOption === "noFree" ? "$10.00" : "0"}</p>
            </div>

            <div className="add__dot add__dot-right"></div>
            <div className="add-right__subtotal">
                <p className="add-right__subtotal-left">Estimated Total</p>
                <p className="add-right__subtotal-right">${totalMoney} </p>
            </div>
        </div>
    );
};
export default Subtotal;
