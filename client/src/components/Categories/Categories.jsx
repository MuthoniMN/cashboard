import React from "react";
import "./Categories.css";

export default function Categories({heading, categories}){
    let totalAmount = categories.reduce((acc, current) => acc + current.total, 0)
    console.log(totalAmount);
    return (
        <section className="categories">
            <h3>{heading}</h3>
            <section className="categoriesContainer">
                {categories.map(category => (<div>
                    <div className="category">
                        <h4>{category.name.replace(category.name[0], category.name[0].toUpperCase())}</h4>
                        <p>{category.total}</p>
                    </div>
                    <div>
                        <div style={{width: `${(category.total / totalAmount) * 100}%`}} className="bar"></div>
                    </div>
                </div>))}
            </section>
        </section>
    )
}