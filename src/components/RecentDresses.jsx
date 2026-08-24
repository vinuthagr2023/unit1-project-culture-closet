import { useState } from "react";
import DressCard from "./DressCard";

function RecentDresses({dresses}){
    return(
        <div>
            <h2> Recent dresses </h2>
            <section className="recentItem">
                <h3>Receently added items</h3>
                <div className="previewGrid">
                    {dresses.map((item) => (
                        <DressCard key={item.id} dress={item} />
                    ))}
                </div>
            </section>

        </div>
    )
}

export default RecentDresses;