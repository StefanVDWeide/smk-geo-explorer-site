// Individual art object interface
export interface artObject {
    id: string;
    created: Date;
    modified: Date;
    acquisition_date: Date;
    acquisition_date_precision: string;
    dimensions: object[];
    inscriptions: object[];
    object_names: object[];
    production: object[];
    production_date: object[];
    techniques: string[];
    object_number: string;
    object_url: string;
    frontend_url: string;
    iiif_manifest: string;
    enrichment_url: string;
    similar_images_url: string;
    production_dates_notes: string[];
    public_domain: boolean;
    rights: string;
    on_display: boolean;
    alternative_images: object[];
    image_mime_type: string;
    image_iiif_id: string;
    image_iiif_info: string;
    image_width: number;
    image_height: number;
    image_size: number;
    image_thumbnail: string;
    image_native: string;
    image_cropped: boolean;
    image_orientation: string;
    image_hq: boolean;
    has_image: boolean;
    colors: string[];
    suggested_bg_color: string[];
    entropy: number;
    contrast: number;
    saturation: number;
    colortemp: number;
    brightness: number;
    has_text: boolean;
    geo_location: string;
    has_3d_file: boolean;
    titles: object[];
    artist: string[];
}

// API response interface
export interface APIBody {
    offset: number,
    rows: number,
    found: number,
    items: Array<artObject>,
    facets: object,
    facets_ranges: object
}
