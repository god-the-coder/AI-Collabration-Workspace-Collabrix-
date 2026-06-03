import time


class RequestTimingMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        start_time = time.time()

        response = self.get_response(request)

        process_time = time.time() - start_time

        response["X-Process-Time"] = str(process_time)

        return response