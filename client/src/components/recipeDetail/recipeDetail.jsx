import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { getDetail, resetDetail } from "../../actions/index";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";
import altimage from "../../utils/altimage.png";
import style from "./recipeDetail.module.css";
import NotFound from "../notFound/notFound";

export function RecipeDetail(props) {
  const { getDetail } = props;
  const { id } = props.match.params;

  useLayoutEffect(() => {
    props.resetDetail();
    getDetail(id);
  }, []);

  return (
    <div className={style.back} id={props.recipe.id}>
      {props.recipe.title ? (
        <div className={style.container}>
          <h2 className={style.title}>{props.recipe.title}</h2>
          <div className={style.imageContainer}>
            <img
              className={style.image}
              src={props.recipe.image ? props.recipe.image : altimage}
              alt=""
            />
          </div>
          <div>
            <h4>Summary:</h4>
            <div className={style.containerText}>
              <span
                className={style.text}
                dangerouslySetInnerHTML={{ __html: props.recipe.summary }}
              ></span>
            </div>
          </div>
          <div>
            <h4>Step by step:</h4>
            <div className={style.containerText}>
              <p
                dangerouslySetInnerHTML={{ __html: props.recipe.instructions }}
              ></p>
            </div>
          </div>
          <div>
            <h4>Score: {props.recipe.spoonacularScore}</h4>

            <h4>Health Score: {props.recipe.healthScore}</h4>

            <h4 className={style.dietsTitle}>Diets:</h4>

            <div className={style.dietsContainer}>
              {props.recipe.diets &&
                props.recipe.diets.map((e, index) => (
                  <p
                    className={style.diets}
                    key={`${props.recipe.id}-${index}`}
                  >
                    {e}
                  </p>
                ))}
            </div>
          </div>
          <div className={style.containerLink}>
            <Link to={"/home"}>
              <h5>Go back</h5>
            </Link>
          </div>
        </div>
      ) : props.recipe.message ? (
        <NotFound />
      ) : (
        <Loading />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recipe: state.details,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDetail: (id) => dispatch(getDetail(id)),
    resetDetail: (x) => dispatch(resetDetail(x)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
