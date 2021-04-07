import { createSelector } from "reselect";
import _ from "underscore";
import { getSelectedLanguages } from "./language";

const selectData = state => state.chart.data;

/**
 * Group total websites views by language.
 *
 * @param data Array<{
 *  tags: Array<{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: string}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 * Return: Array<{ language: string, views: number }>
 */
export const groupByLanguage = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    // TODO: Implement
    return;
  }
);

/**
 * Flattened list of daily views.
 *
 * @param data Array<{
 *  tags: <{name: string}>;
 *  url: string;
 *  website_views: Array<{ date: string, count: number}>
 * }>
 * @param languages Array<{name: string, displayed: bool}>
 *
 *
 * Return: Array<{
 *    count: number;
 *    date: string;
 *    website: string;
 * }>
 */
export const flattenWebsiteViews = createSelector(
  [selectData, getSelectedLanguages],
  (data, languages) => {
    return _.flatten(
      data
        .filter(
          website =>
            website.tags.filter(tag =>
              languages.map(lang => lang.name).includes(tag.name)
            ).length > 0
        )
        .map(website =>
          website.website_views.map(views => {
            return {
              count: views.count,
              date: views.date,
              website: website.url
            };
          })
        )
    );
  }
);
