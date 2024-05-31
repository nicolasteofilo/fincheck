import { ArgumentMetadata, ParseEnumPipe } from "@nestjs/common";

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
    override transform(value: T, metadata: ArgumentMetadata) {
        if (value) {
            return super.transform(value, metadata);
        }
    }
}