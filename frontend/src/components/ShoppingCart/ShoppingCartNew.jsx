import { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import yellowImage from "../../static/images/Solid_yellow.jpg";

export default function ShoppingCartDrawer({isOpen}) {
    const {cartItems} = useCart();
    
    return (
        <div className={`flex flex-col fixed h-full top-0 left-0 z-20 bg-neutral-800 overflow-x-hidden ease-in duration-500 ${isOpen ? "w-[25vw] px-5" : "w-0"}`}>
            {cartItems.map((item) => 
                <div className="py-4 first:pt-0 last:pb-0 flex flex-row">
                    <img className="max-w-40 max-h-40 w-fit h-fit pr-5" src={yellowImage} />
                    <div className="flex flex-col truncate w-full ">
                        <p>{item.manufacturerName}</p>
                        <p className="pt-1 pb-4 text-2xl uppercase">{item.name}</p>
                        <div className="flex row justify-between w-[25vw]">
                            <p className="text-xl">{item.quantity}</p>
                            <p className="text-xl">100$</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
