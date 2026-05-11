// imports
import { StrapiCollectionMetaType, StrapiDataType, StrapiMediaType, StrapiResponseType } from './responseTypes';

export interface StreamType {
    name: string;

    // populated field
    streamCover?: StrapiMediaType;
}

export type StreamListResponseType = StrapiResponseType<(StreamType & StrapiDataType)[], StrapiCollectionMetaType>;
