import logging

import psycopg2

from psycopg2.extensions import connection as Connection
from psycopg2 import sql

logger = logging.getLogger(__name__)


class DataWrapper:
    def __init__(self, conn: Connection, schema_name: str) -> None:
        self._conn = conn
        self._schema = schema_name

    def solar(self, longitude, latitude):
        with self._conn.cursor() as cur:
            try:
                cur.execute(sql.SQL("""
                    SELECT
                        time,
                        solar_potential * 60
                    FROM energylink.future
                    ORDER BY time;
                """))
                resp = cur.fetchall()

            except psycopg2.Error as e:
                self._conn.rollback()
                raise e

        data = {
            "solar": [_[1] for _ in resp],
            "labels": [_[0] for _ in resp],
            "consumption": [20, 40, 50]
        }
        return data

    def consumption(self):
        with self._conn.cursor() as cur:
            try:
                cur.execute(sql.SQL("""
                    select sum(kw_power_all)
                    from energylink.power_2016_hh_avg_1
                    where local >= now() - interval '3 years'
                    and local <= now() - interval '3years' + interval '6 hours'
                    group by extract(hour from local);
                """))
                resp = cur.fetchall()

            except psycopg2.Error as e:
                self._conn.rollback()
                raise e

        return resp

    def transactions(self, f):
        with self._conn.cursor() as cur:
            try:
                if f:
                    cur.execute(sql.SQL("""
                        select
                            timestamp,
                            transaction
                        from energylink.transactions
                        where transaction < 0
                        order by timestamp desc;
                    """))
                else:
                    cur.execute(sql.SQL("""
                        select
                            timestamp,
                            transaction
                        from energylink.transactions
                        where transaction >= 0
                        order by timestamp desc;
                    """))
                resp = cur.fetchall()

            except psycopg2.Error as e:
                self._conn.rollback()
                raise e

        return resp

