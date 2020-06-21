/**
 * Contiene funciones para procesos de la Plataforma
 */

import catalog from './seed'

/**
 * Función para paginar el catálogo.
 */
export function Paginator(page, per_page) {
 
    var page = page || 1,
    per_page = per_page || 5,
    offset = (page - 1) * per_page,
   
    paginatedItems = catalog.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(catalog.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: catalog.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}

/**
 * Función para paginar el catálogo.
 */
export function PlotPaginator(page, plot) {
 
    var page = page || 1,
    per_page = 1,
    offset = (page - 1) * per_page

    console.log(offset)
    console.log(plot.slice(offset))

    paginatedItems = plot.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(plot.length / per_page);
    return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: (total_pages > page) ? page + 1 : null,
        total: plot.length,
        total_pages: total_pages,
        data: paginatedItems
    };
}