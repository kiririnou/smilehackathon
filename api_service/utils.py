def triangle_area(a, b, c):
    x1, y1, x2, y2, x3, y3 = a[0], a[1], b[0], b[1], c[0], c[1]
    return abs(0.5 * (((x2-x1)*(y3-y1))-((x3-x1)*(y2-y1))))


def bucket_avg(bucket):
    x_sum, y_sum = 0, 0

    for point in bucket:
        x_sum += point[0]
        y_sum += point[1]

    return x_sum / len(bucket), y_sum / len(bucket)


def split_data(data, num_of_buckets):
    k, m = divmod(len(data), num_of_buckets)
    return [data[i * k + min(i, m):(i + 1) * k + min(i + 1, m)] for i in range(num_of_buckets)]


def downsample_time_series_lttb(data, threshold):
    if len(data) < 3:
        return []

    if threshold > len(data):
        return data

    buckets = [
        [data[0]],
        *list(split_data(data[1:-1], threshold-2)),
        [data[-1]]
    ]

    last_selected = data[0]
    selected_points = [last_selected]

    for i, bucket in enumerate(buckets[1:-1]):
        ranked_points = {}
        for point in bucket:

            area = triangle_area(last_selected, point, bucket_avg(buckets[i+1]))
            ranked_points[round(area, 2)] = point

        last_selected = ranked_points[max(ranked_points.keys())]
        selected_points.append(last_selected)
    selected_points.append(data[-1])

    return selected_points
