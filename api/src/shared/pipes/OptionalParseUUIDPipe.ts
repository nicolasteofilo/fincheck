import { ArgumentMetadata, ParseUUIDPipe } from "@nestjs/common";

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
    override transform(value: string, metadata: ArgumentMetadata) {
        if (value) {
            return super.transform(value, metadata);
        }
    }
}