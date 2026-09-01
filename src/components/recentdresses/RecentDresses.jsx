import { useState } from "react";
import DressCard from "../dresscard/DressCard";
import "./RecentDresses.css";

function RecentDresses({ dresses =[]}) {
    // Take only the first 2 items from the array
   const recentItems = dresses.slice(0, 2);

    return (
        <div className="recent-container">
            <h2> Recent dresses </h2>
            <section className="recentItem">
              
                {recentItems.length === 0 ? (
                    <p className="no-dresses-msg">No dresses available yet.</p>
                ) : (
                    <div className="previewGrid">
                        {recentItems.map((item) => (
                            <DressCard key={item.id} dress={item} />
                        ))}
                    </div>
                )}
            </section>

        </div>
    )
}

export default RecentDresses;