import {Observable, of} from "rxjs";
import {Response, ResponseOptions} from "@angular/http";

function createResponse(body) {
    return of(new Response(new ResponseOptions({
        body: JSON.stringify(body)
    })))
}
export class HttpServiceMock {
    get() {
        return createResponse([]);
    }
}